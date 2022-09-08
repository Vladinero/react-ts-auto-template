import React, {useState} from 'react';

import {useGetUsersQuery, useLazyGetUserReposQuery} from '../../store/ProjectApi/projectApi';
import {useDebounce} from '../../hooks/useDebounce';

import classes from './ExamplePage.module.scss';
import {useActions} from '../../hooks/actions';
import {useAppSelector} from '../../hooks/redux';

export interface ExamplePageProps {
}

export const ExamplePage = ({}: ExamplePageProps) => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);

  const {data: users, isLoading, isError} = useGetUsersQuery(debounced, {
    skip: search.length < 3,
    refetchOnFocus: true
  });

  const [fetchRepos, {isLoading: isReposLoading, isError: getReposError, data: repos}] = useLazyGetUserReposQuery();

  const handleClick = (username: string) => {
    fetchRepos(username)
  };

  const {addToFavourite, removeFromFavourite} = useActions();
  const favourites = useAppSelector(state => state.github.favourites);

  const addFavourite = (e: React.MouseEvent<HTMLLIElement>, repo_url: string) => {
    e.preventDefault();
    addToFavourite(repo_url)
  };
const removeFavourite = (repo_url: string) => {
  removeFromFavourite(repo_url);
};

  return (
    <div className={classes["examplePage"]} data-testid="examplePage">
      <h1>ExamplePage Component</h1>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {isLoading && <h2>Loading...!</h2>}
      {isError && <h2>Something went wrong!</h2>}
      <ul>
        {
          users && users.map(user => (
            <li
              key={user.id}
              onClick={() => handleClick(user.login)}>
              {user.login}
            </li>
          ))
        }
      </ul>
      <div>
        <h2>{`${search} Repos`}</h2>
        {isReposLoading && <h2>Repos are loading...</h2>}
        {getReposError && <h2>Something went wrong!</h2>}
        {repos?.map(repo => (
          <li
            key={repo.id}
            onClick={(e) => addFavourite(e, repo.url)}>{repo.url}</li>
        ))
        }
      </div>
      <h2>Favourites</h2>
      <ul>
        {favourites.map(fav => <li key={fav} onClick={() => removeFavourite(fav)}>{fav}</li>)}
      </ul>
    </div>)
};