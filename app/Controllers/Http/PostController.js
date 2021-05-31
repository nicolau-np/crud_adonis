'use strict'

const Post = use('App/Models/Post')


class PostController {

  async index({ view }){
    const posts = await Post.all()
    const data = {
      title: "Ultimas Postagens",
      menu: "Home",
      posts: posts.toJSON(),
    }
      return view.render('posts.index', data)
  }

  async details({ params, view }){
    const post = await Post.find(params.id)
    const data = {
      title: "Detalhes",
      menu: "Post",
      post: post,
    }
      return view.render('posts.details', data)
  }

  async add({ view }){
    const data = {
      title: "Novo",
      menu:"Post",
    }

    return view.render('posts.add', data)
  }

  async store({ request, response, session }){

    const data = {
      title: request.input('title'),
      body: request.input('body'),
    }

    const post = await Post.create(data)

    if(post){
      session.flash({ notification: 'Feito com sucesso' })
    }

    return response.redirect('back')
  }
}

module.exports = PostController
