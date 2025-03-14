export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
  
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      const newUrl = photosJson[index].url.replace('https://via.placeholder.com', 'https://picsum.photos/seed').split("/")
        const p1 = newUrl[newUrl.length - 1] 
        const p2 = newUrl[newUrl.length - 2]
 
        newUrl[newUrl.length - 1] = p2
        newUrl[newUrl.length - 2] = p1
        
        return { ...post, cover: newUrl.join("/") };

    });

    return postsAndPhotos;
}