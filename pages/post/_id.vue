<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          alt="post image"
        />
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"
        :postId="post._id"
      />
      <div class="comments" v-if="post.comments && post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment';
import AppCommentForm from '@/components/main/CommentForm';

export default {
  validate({ params }) {
    return Boolean(params.id); // Проверяем наличие ID
  },
  async asyncData({ store, params, error }) {
    try {
      const post = await store.dispatch('post/fetchById', params.id);
      if (!post) {
        // Если пост не найден, вызываем ошибку
        return error({ statusCode: 404, message: 'Пост не найден' });
      }
      await store.dispatch('post/addView', post);
      return {
        post: { ...post, views: post.views + 1 } // Увеличиваем количество просмотров
      };
    } catch (e) {
      // Если произошла ошибка при получении поста
      return error({ statusCode: 404, message: 'Ошибка при получении поста' });
    }
  },
  data() {
    return {
      canAddComment: true
    };
  },

  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },

  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment);
      this.canAddComment = false; // Запрещаем добавление комментариев
    }
  },
  components: { AppComment, AppCommentForm }
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 600px;
  margin: 0 auto;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}

.post-image img {
  width: 100%;
  height: auto;
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-content {
  margin-bottom: 2rem;
}
</style>










<!-- <template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{post.views}}
        </small>
      </div>
      <div class="post-image">
        <img
          :src="post.imageUrl"
          alt="post image"
        >
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"
        :postId="post._id"
      />

      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: {...post, views: ++post.views}
    }
  },
  data() {
    return {
      canAddComment: true
    }
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  },
  components: {AppComment, AppCommentForm}
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
  }
</style> -->

