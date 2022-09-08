import React, {useState} from 'react';

import {useGetUsersQuery, useLazyGetUserReposQuery} from '../../store/ProjectApi/projectApi';
import {useDebounce} from '../../hooks/useDebounce';

import classes from './ExamplePage.module.scss';
import {useActions} from '../../hooks/actions';
import {useAppSelector} from '../../hooks/redux';
import {useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery} from '../../store/ProjectApi/goodsApi';

export const ExamplePage = () => {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');

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


  const {data: goods, isLoading: isGoodsLoading, isError: isGoodsError} = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();

  const handleAddProduct = async () => {
  if (newProduct) {
    await addProduct({title: newProduct, id: Date.now().toString()}).unwrap();
  }
  setNewProduct('')
  };

  const handleProduct = (e: React.ChangeEvent<HTMLInputElement>) => setNewProduct(e.target.value);

const [deleteProduct] = useDeleteProductMutation();

const handleDeleteProduct = async (id: string) => await deleteProduct(id).unwrap();

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

      <h2>Goods</h2>
      {isGoodsLoading && <h2>Goods loading...!</h2>}
      {isGoodsError && <h2>Can't get goods!</h2>}
      <input type="text" value={newProduct} onChange={handleProduct}/>
      <button onClick={handleAddProduct}>Add good</button>
      <select value={count} onChange={e => setCount(e.target.value)}>
        <option value="''">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <ul>
        {
          goods?.map(good => <li key={good.id} onClick={() => handleDeleteProduct(good.id)}>{good.title}</li>)
        }
      </ul>
    </div>)
};