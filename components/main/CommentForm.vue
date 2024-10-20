<template>
  <div>

    <el-form
      v-if="!submitted"
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h1>Добавить комментарий</h1>

      <el-form-item label="Ваше имя" prop="name">
        <el-input v-model="controls.name" />
      </el-form-item>

      <el-form-item label="Текст комментария" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="2"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Добавить комментарий
        </el-button>
      </el-form-item>
    </el-form>


    <el-alert
      v-if="showAlert"
      title="Комментарий добавлен! Комментарий появится после перезагрузки страницы."
      type="success"
      show-icon
      center
      :closable="false"
    />
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      submitted: false, // Флаг, чтобы отслеживать отправку формы
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Введите ваш комментарий', trigger: 'blur' }
        ]
      },
      showAlert: false // Для управления показом уведомления
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          };

          try {
            const newComment = await this.$store.dispatch('comment/create', formData);
            this.$emit('commentAdded', newComment); // Уведомляем родительский компонент

            // Очищаем форму
            this.controls.name = '';
            this.controls.text = '';
            this.loading = false;

            // Скрываем форму и показываем уведомление
            this.submitted = true; // Устанавливаем флаг, чтобы скрыть форму
            this.showAlert = true;

            // Убедимся, что уведомление будет видимо до перезагрузки страницы
            setTimeout(() => {
              this.showAlert = false; // Скрываем уведомление через 2 секунды
            }, 2000);
          } catch (e) {
            this.loading = false;
            this.$message.error('Ошибка при добавлении комментария');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>











<!-- <template>
  <div>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h1>Добавить комментарий</h1>

      <el-form-item label="Ваше имя" prop="name">
        <el-input v-model="controls.name" />
      </el-form-item>

      <el-form-item label="Текст комментария" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="2"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Добавить комментарий
        </el-button>
      </el-form-item>
    </el-form>

     Уведомление об успешном добавлении комментария
    <el-alert
      v-if="showAlert"
      title="Комментарий добавлен! Комментарий появится после перезагрузки страницы."
      type="success"
      show-icon
      center
      :closable="false"
    />

     Уведомление об ошибке при добавлении комментария
    <el-alert
      v-if="showError"
      title="Ошибка при добавлении комментария."
      type="error"
      show-icon
      center
      :closable="false"
    />
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Введите ваш комментарий', trigger: 'blur' }
        ]
      },
      showAlert: false, // Для управления показом уведомления об успешном добавлении
      showError: false   // Для управления показом уведомления об ошибке
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          this.showError = false; // Скрываем уведомление об ошибке перед новым запросом

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          };

          try {
            const newComment = await this.$store.dispatch('comment/create', formData);
            this.$emit('commentAdded', newComment); // Уведомляем родительский компонент

            // Очищаем форму
            this.controls.name = '';
            this.controls.text = '';
            this.loading = false;

            // Показываем уведомление об успешном добавлении
            this.showAlert = true;

            // Скрываем уведомление через 2 секунды
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          } catch (e) {
            this.loading = false;
            this.showError = true; // Показываем уведомление об ошибке
            console.error('Ошибка при добавлении комментария:', e); // Логируем ошибку для отладки

            // Скрываем уведомление об ошибке через 2 секунды
            setTimeout(() => {
              this.showError = false; // Скрываем ошибку через 2 секунды
            }, 2000);
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style> -->











<!-- <template>
  <div>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h1>Добавить комментарий</h1>

      <el-form-item label="Ваше имя" prop="name">
        <el-input v-model="controls.name" />
      </el-form-item>

      <el-form-item label="Текст комментария" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="2"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Добавить комментарий
        </el-button>
      </el-form-item>
    </el-form>

    <el-alert
      v-if="showAlert"
      title="Комментарий добавлен!"
      type="success"
      show-icon
      center
      :closable="false"
    />
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Введите ваш комментарий', trigger: 'blur' }
        ]
      },
      showAlert: false // Для управления показом уведомления
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          };

          try {
            const newComment = await this.$store.dispatch('comment/create', formData);
            this.$emit('commentAdded', newComment); // Уведомляем родительский компонент

            // Очищаем форму
            this.controls.name = '';
            this.controls.text = '';
            this.loading = false;

            // Показываем уведомление об успешном добавлении
            this.showAlert = true;

            // Скрываем уведомление через 2 секунды
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          } catch (e) {
            this.loading = false;
            this.$message.error('Ошибка при добавлении комментария');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style> -->
























