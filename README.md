# social network

бэкенд-часть с API-сервером

Лента новотей(из подписок), возможность подписаться на пользователя, поставить/убрать свой лайк, оставить и удалить собственный комментарий.

# реализована возможность:

api/auth/register - регистрация
api/auth/login - аутентификация ("token": "Bearer")

api/posts - новй пост

# auth = require("./auth");

api/auth/register - регистрация
api/auth/login - аутентификация ("token": "Bearer")

# postsComments = require("./posts-comments");

api/posts/:\_id/comments - комментарий
DEL api/posts/:\_id/comments/:\_id - удаление комментария

# postsLikes = require("./posts-likes");

POST api/posts/:\_id/likes/ - лайк
DEL api/posts/:\_id/likes/:\_id - удаление лайка

# posts = require("./posts");

api/posts - новый пост
GET api/posts/:\_id - получения списка постов
DEL api/posts/:\_id - удалить пост
GET api/posts/:\_id - получения поста по идентификатору :\_id

# subscriptions = require("./subscriptions");

POST /api/subscriptions - подписка
GET api/subscriptions - подписки
DEL api/subscriptions/:\_id - удалить подписку

# users = require("./users");

GET api/users - все пользователи
GET api/users/:\_id - получение users по id
