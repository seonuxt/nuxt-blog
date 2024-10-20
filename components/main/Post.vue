<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="post-header">
      <h3 v-if="post.title">{{ post.title }}</h3>

      <small v-if="post.date">
        <i class="el-icon-time"></i>
        {{ new Date(post.date).toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="post image"
        class="post-img"
      >
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>

      <span>
        <i class="el-icon-message"></i>
        <!-- Проверяем, что comments существует и является массивом -->
        {{ post.comments && Array.isArray(post.comments) ? post.comments.length : 0 }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-img {
    width: 100%;
    height: auto;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
</style>









<!-- <template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="post-header">
      <h3>{{post.title}}</h3>

      <small>
        <i class="el-icon-time"></i>
        {{ new Date(post.date).toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img
        :src="post.imageUrl"
        alt="post image"
        class="post-img"
      >
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>

      <span>
        <i class="el-icon-message"></i>

        {{post.comments.length}}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-img {
    width: 100%;
    height: auto;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
</style> -->


