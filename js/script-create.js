const KEY = 'postKey';

    function readPost() {
      try { return JSON.parse(localStorage.getItem(KEY)) || []; }
      catch { return []; }
    }

    function writePost(post) {
      localStorage.setItem(KEY, JSON.stringify(post));
    }

    function addToList() {
      // const title = document.getElementById("title").value;
      // const content = document.getElementById("content").value;
      const draft = JSON.parse(localStorage.getItem('draftPost'));
      const title = draft.title;
      const content = draft.content;
      const area = draft.area;
      const areaName = draft.areaName;
      const type = draft.type;
      const user = draft.user;


      // date stuff //
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // january is 0
      const year = today.getFullYear();
      const date = `${day}/${month}/${year}`;
      console.log(title);
      console.log(content);
      let post = readPost();
      const lastId = post.length > 0 ? Math.max(...post.map(item => item.id)) : 0;
      const id = lastId + 1;
      post.push({id, title, content, date, area, areaName, type, user});
      
      writePost(post);
    }