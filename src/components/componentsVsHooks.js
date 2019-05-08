import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchSomething = async query => {
  return await axios
    .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    .then(res => {
      return { result: res, error: false };
    })
    .catch(e => {
      return { result: null, error: true };
    });
};

// components
class User extends React.Component {
  state = { user: null }; // 1. keep track of state

  fetch() {
    fetchSomething(this.props.query).then(res => {
      this.setState({ user: res.result }); // 2. async fetching and setting state
    });
  }

  componentDidMount() {
    this.fetch(); // 3. component setup
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      if (!this.__isUnMounted) this.fetch(); // 4. component listen to change (diffing)
    }
  }

  componentWillUnmount() {
    this.__isUnMounted = true; // 5. component teardown
  }

  render() {
    return this.props.children(this.state.user); // 6. component output
  }
}

const AppComponent = ({ query }) => {
  return (
    <User query={query}>
      {user => {
        return <p>{JSON.stringify(user)}</p>;
      }}
    </User>
  );
};

// ------
// hooks

const useUser = query => {
  const [user, setUser] = useState(null); // 1. keep track of state

  useEffect(() => {
    let current = true; // 3. component setup (useEffect)
    fetchSomething(query).then(res => {
      if (current) setUser(res); // 2. async fetching and setting state
    });
    return () => {
      current = false; // 5. component teardown
    };
  }, [query]); // 4. component listen to change (dependency array diffed by react)

  return user; // 6. component output
};

const useDetails = query => {
  let q;
  if (query) {
    q = query.result.data.hits[0].title;
    console.log("query is", query.result.data.hits[0].title);
  }

  const [user, setUser] = useState(null); // 1. keep track of state

  useEffect(() => {
    let current = true; // 3. component setup (useEffect)
    fetchSomething(q).then(res => {
      if (current) setUser(res); // 2. async fetching and setting state
    });
    return () => {
      current = false; // 5. component teardown
    };
  }, [query]); // 4. component listen to change (dependency array diffed by react)

  return user; // 6. component output
};

const AppHooks = ({ query }) => {
  const user = useUser(query);
  const details = useDetails(user);
  return (
    <>
      <p>{JSON.stringify(user).slice(0, 50)}</p>
      <p>{JSON.stringify(details)}</p>
    </>
  );
};

export default AppHooks;
