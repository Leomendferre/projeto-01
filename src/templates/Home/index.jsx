import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts.js';
import { Posts } from '../../components/Posts/index.jsx';
import { Button } from '../../components/Button/index.jsx';
import { TextInput } from '../../components/TextInput/index.jsx';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValeu, setSearchValeu] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValeu ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValeu.toLowerCase()
      );
    })
    : posts;

  const handleLoadPosts = useCallback (async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValeu(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValeu && (
          <h1>Serach valeu: {searchValeu} <br></br></h1>
        )}

        <TextInput searchValeu={searchValeu} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p> Não existem posts =( </p>
      )}

      <div className="button-container">
        {!searchValeu && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValeu: ''
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValeu: value });
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValeu } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValeu ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValeu.toLowerCase()
//         );
//       })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValeu && (
//             <h1>Serach valeu: {searchValeu} <br></br></h1>
//           )}

//           <TextInput searchValeu={searchValeu} handleChange={this.handleChange} />
//         </div>
//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p> Não existem posts =( </p>
//         )}

//         <div className="button-container">
//           {!searchValeu && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }