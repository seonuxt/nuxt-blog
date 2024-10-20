import axios from 'axios';

export const state = () => ({
  error: null,
});

export const mutations = {
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  },
};

export const actions = {
  async create({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/comment', data);
      commit('clearError');
      return response;
    } catch (e) {
      commit('setError', e.response?.data?.message || 'Ошибка при добавлении комментария', { root: true });
      throw e;
    }
  }
};

export const getters = {
  error: (state) => state.error,
};






/* export const actions = {
  async create({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/comment', data);
      commit('clearError'); // Очищаем ошибку перед успешным запросом
      return response; // Возвращаем созданный комментарий
    } catch (e) {
      // Логируем ошибку и сохраняем в состояние
      commit('setError', e.response?.data?.message || 'Ошибка при добавлении комментария', { root: true });
      throw e; // Пробрасываем ошибку дальше, чтобы обработать её в компоненте
    }
  }
}; */







/* // store/comment.js
import axios from 'axios';

export const state = () => ({
  comments: [],  // Состояние для хранения комментариев
  error: null,   // Состояние для ошибок
});

export const mutations = {
  setComments(state, comments) {
    state.comments = comments;  // Устанавливаем список комментариев
  },
  setError(state, error) {
    state.error = error;  // Записываем ошибку в состояние
  },
  clearError(state) {
    state.error = null;  // Очищаем ошибку
  },
  // Другие мутации при необходимости
};

export const actions = {
  async create({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/comment', data);
      commit('clearError'); // Очищаем ошибку перед успешным запросом
      return response; // Возвращаем созданный комментарий
    } catch (e) {
      commit('setError', e.response.data.message || 'Ошибка при добавлении комментария', { root: true });
      throw e; // Пробрасываем ошибку дальше
    }
  },
  async fetchComments({ commit }, postId) {
    try {
      const comments = await this.$axios.$get(`/api/comment?postId=${postId}`);
      commit('setComments', comments); // Устанавливаем комментарии в состояние
    } catch (e) {
      commit('setError', e.response.data.message || 'Ошибка при загрузке комментариев', { root: true });
    }
  },
  // Другие действия при необходимости
};

export const getters = {
  getComments(state) {
    return state.comments; // Возвращаем список комментариев
  },
  getError(state) {
    return state.error; // Возвращаем ошибку
  },
}; */







/* // store/comment.js
import axios from 'axios';

export const state = () => ({
  // Ваши состояния
});

export const mutations = {
  setError(state, error) {
    // Обработка ошибки (например, запись в состояние или логирование)
    state.error = error;
  },
  // Другие мутации
};

export const actions = {
  async create({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/comment', data);
      return response; // Возвращаем созданный комментарий
    } catch (e) {
      commit('setError', e, { root: true });
      throw e; // Пробрасываем ошибку дальше
    }
  },
  // Другие действия
};

export const getters = {
  // Ваши геттеры
}; */







/* export const actions = {
  async create({commit}, data) {
    try {
      return await this.$axios.$post('/api/comment', data)
    } catch (e) {
      commit('setError', e, {root: true})
    }
  }
} */
