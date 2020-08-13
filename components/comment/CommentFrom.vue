<template>
  <v-card :elevation="10" class="my-4">
    <v-card-title>我要发表看法</v-card-title>
    <v-card-subtitle>您的留言 （支持Markdown语法）</v-card-subtitle>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="form.username"
          :rules="nameRules"
          :counter="10"
          label="您的昵称"
          required
        ></v-text-field>
        <v-text-field v-model="form.link" label="个人网址"></v-text-field>

        <v-textarea
          id="comment-textarea"
          v-model="form.content"
          name="comment"
          label="请填写评论"
          hint="文明发言"
          required
          :rules="commentRules"
          :counter="500"
          @change="quote = {}"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions style="justify-content: flex-end;">
      <v-btn :loading="loading" color="primary mr-2" @click="submit">
        提交
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { commentCreat } from '@/api/comment'

export default {
  name: 'CommentForm',
  props: {
    articleId: {
      type: [String, Number],
      default: ''
    },
    quote: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        username: '',
        content: ''
      },
      loading: false,
      nameRules: [
        (v) => !!v || '请填写昵称',
        (v) => (v && v.length < 10) || '昵称长度不能超过10'
      ],
      commentRules: [
        (v) => !!v || '请填写评论',
        (v) => (v && v.length < 500) || '评论长度不能超过500'
      ],
      valid: true
    }
  },
  watch: {
    quote: 'initQuote'
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.articleId = this.articleId
        const res = await commentCreat(this.form)
        this.loading = false
        if (res.code === 200) {
          this.form.id = res.data
          this.setNewList(this.form)
        }
      }
    },
    setNewList(data) {
      const item = JSON.parse(JSON.stringify(data))
      item.createTime = new Date()
      this.$emit('setNewList', item)
      this.$refs.form.reset()
    },
    initQuote() {
      // TODO
      if (!this.quote) return
      const content =
        '> `引用' +
        this.quote.username +
        '的发言` \n' +
        '> ' +
        this.quote.content.replace(/\n/gi, '\n >') +
        '\n'
      this.form.content = content
    }
  }
}
</script>
