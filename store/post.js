export const state = () => ({
  posts: [],
  post: null,
  error: null,
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    state.post = post;
  },
  addPost(state, post) {
    state.posts.push(post);
  },
  updatePost(state, updatedPost) {
    const index = state.posts.findIndex(p => p._id === updatedPost._id);
    if (index !== -1) {
      state.posts[index] = updatedPost;
    }
  },
  removePost(state, id) {
    state.posts = state.posts.filter(post => post._id !== id);
  },
  incrementViews(state, id) {
    const post = state.posts.find(p => p._id === id);
    if (post) {
      post.views++;
    }
  },
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  },
};

export const actions = {
  async fetchAdmin({ commit }) {
    try {
      const posts = await this.$axios.$get('/api/post/admin');
      commit('setPosts', posts);
      return posts;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async fetch({ commit }) {
    try {
      const posts = await this.$axios.$get('/api/post');
      commit('setPosts', posts);
      return posts;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async remove({ commit }, id) {
    try {
      await this.$axios.$delete(`/api/post/admin/${id}`);
      commit('removePost', id);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async update({ commit }, { id, text }) {
    try {
      const post = await this.$axios.$put(`/api/post/admin/${id}`, { text });
      commit('updatePost', post);
      return post;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async create({ commit }, { title, text, image }) {
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('text', text);
      fd.append('image', image, image.name);

      const post = await this.$axios.$post('/api/post/admin', fd);
      commit('addPost', post);
      return post;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async fetchAdminById({ commit }, id) {
    try {
      const post = await this.$axios.$get(`/api/post/admin/${id}`);
      commit('setPost', post);
      return post;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async fetchById({ commit }, id) {
    try {
      const post = await this.$axios.$get(`/api/post/${id}`);
      commit('setPost', post);
      return post;
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },

  async addView({ commit }, { views, _id }) {
    try {
      await this.$axios.$put(`/api/post/add/view/${_id}`, { views });
      commit('incrementViews', _id);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },
};

export const getters = {
  posts: state => state.posts,
  post: state => state.post,
  error: state => state.error,
};









/* const posts = [
  {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: 'id1'},
  {title: 'Post 2', date: new Date(), views: 22, comments: [1, 2], _id: 'id2'}
]

export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async update({commit}, {id, text}) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {text})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async create({commit}, {title, text, image}) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async addView({commit}, {views, _id}) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
} */
