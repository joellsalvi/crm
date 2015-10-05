'use strict';
/**
 * @autor joelsalvi
 * @date 05/06/2015
 */

angular.module('MainApp').controller('HomeCtrl', function($scope, $http, $location, $route, $modal, utilsFactory) {
    
    var SERVICE_NAME = 'http://localhost:8080/service/public/postagem';
    var SERVICE_NAME_USUARIO = 'http://localhost:8080/service/public/usuario';
    var SERVICE_NAME_COMMENT = 'http://localhost:8080/service/public/comentario';
    
    var idAuthenticatedUser = $location.url().split("/")[2];
    $scope.menuLeftContent = 'view/partials/home/menuLeftContent.html';
    $scope.menuRightContent = 'view/partials/home/menuRightContent.html';
    
    $scope.authenticatedUser = {};
    $scope.wallPosts = [];
    $scope.wallPostsAux = [];
    
    $scope.amigos = [];
    /* RETORNA USUARIOS DO BANCO */
    $http.get(SERVICE_NAME_USUARIO)
        .success(function(data) {
                $scope.amigos = angular.copy(data);
        })
        .error(function(data, status) {
    });
    
    $scope.qntRegistrosPg = 7;
	$scope.page = 0;
    
    $scope.interval = {};
    $scope.timeout = {};
    
    /* RETORNA USUARIO AUTENTICADO */
    $http.get(SERVICE_NAME_USUARIO+'/'+idAuthenticatedUser)
    .success(function(data) {
            $scope.authenticatedUser = angular.copy(data);
    })
    .error(function(data, status) {
    });
        
    /* LISTA DE OBJETOS POST */
    $scope.post = {
        id:'',
        dsPostagem:'',
        dtPostagem:'',
        likes:'',
        ftPostagem:'',
        vdPostagem:'',
        ativo:'S',
        usuarioEntity: {},
        comentarioEntity: []
    };
    $scope.post.comentario = {};
    
    /* OBJETO POST */
    $scope.newPost = {
            id: '',
            dsPostagem: '',
            ativo: 'S',
            dtPostagem : '',
            likes: '',
            ftPostagem: '',
            vdPostagem: '',
            usuarioEntity: { 
                id: idAuthenticatedUser,
                nome: angular.copy($scope.authenticatedUser.nome),
                sobrenome: angular.copy($scope.authenticatedUser.sobrenome),
                fotoPerfilMini: angular.copy($scope.authenticatedUser.fotoPerfilMini)
            }
    };
    
    /* LISTA DE OBJETOS COMENTARIO */
    $scope.comentarios = [];
    
    /* OBJETO COMENTARIO */
    $scope.comentario = {}
    $scope.criarObjComentario = function(comentario) {
        $scope.comentario = {
            ativo: 'S',
            dsComentario: comentario.dsComentario,
            dtComentario: new Date(),
            postagemEntity: '',
            usuarioEntity: angular.copy($scope.authenticatedUser)
        }
    };
    
    /* ############################# POST METHODS START ############################# */
    
    /* INICIALIZA MURAL DE POSTS */
    $scope.initializeMyWall = function() {
        var SERVICE_NAME_FEED = SERVICE_NAME+'/findByAtivo?page='+$scope.page+'&size='+$scope.qntRegistrosPg+'&fields=dtPostagem&direction=false';
        $http.get(SERVICE_NAME_FEED)
        .success(function(data) {
                var len = '';
                if($scope.qntRegistrosPg <= data.length) {
                    len = $scope.qntRegistrosPg;
                } else {
                    //A quantidade de post no banco é menor que a qnt de registro pedida para visualizar no feed
                    len = data.length;
                }
                var i=0;
                var foiAdicionadoNoMinimoUmRegistro = false;
                for(;i<len;i++) {
                    if(data[i].ativo == 'S') {
                        $scope.wallPostsAux.push(data[i]);
                        foiAdicionadoNoMinimoUmRegistro = true;
                    }
                }
                if(foiAdicionadoNoMinimoUmRegistro == false) {
                    if($scope.wallPostsAux.length > 0) {
                        $scope.wallPosts = $scope.wallPostsAux;
                    }
                }
                else if($scope.wallPostsAux.length < $scope.qntRegistrosPg) {
                    $scope.loadMorePosts();
                }
                else {
                    $scope.wallPosts = $scope.wallPostsAux;
                }
        })
        .error(function(data, status) {
        });
    }
    
    /* EXECUTA METODO DO PARAMETRO NO TEMPO DO SEGUNDO PARAMETRO */
    $scope.initializeTimeout = function() {
        $scope.initializeMyWall();
    }
    $scope.timeout = setTimeout(function() { $scope.initializeTimeout(); }, 1);
    
    /* EXECUTA METODO DO PARAMETRO APÓS O INTERVALO DE TEMPO DO SEGUNDO PARAMETRO */
    $scope.initializeInterval = function() {
        $scope.wallPostsAux = [];
        $scope.initializeMyWall();
        
    }
    setInterval(function() { $scope.initializeInterval(); }, 1000 * 30);
    
    /* AUMENTA CAPACIDADE DO FEED PARA CARREGAR MAIS POSTS PARA VISUALIZAÇÃO */
    $scope.loadMorePosts = function() {
        //$scope.qntRegistrosPg = $scope.qntRegistrosPg + 5;
        $scope.page = $scope.page + 1;
        clearTimeout($scope.interval);
        clearTimeout($scope.timeout);
        $scope.initializeTimeout();
    };
    
    /* MÉTODO USADO PARA CRIAÇÃO DE NOVO POST */
    $scope.createNewPost = function() {
        var d = new Date();
        $scope.newPost.dtPostagem = d.getTime();
        $http.post(SERVICE_NAME, $scope.newPost)
            .success(function(data) {
                if(data) {
                        $scope.newPost.ativo = data.ativo;
                        $scope.newPost.dsPostagem = data.dsPostagem;
                        $scope.newPost.dtPostagem = data.dtPostagem;
                        $scope.newPost.ftPostagem = data.ftPostagem;
                        $scope.newPost.id = data.id;
                        $scope.newPost.usuarioEntity = $scope.authenticatedUser;
                        $scope.newPost.likes = data.likes;
                        $scope.newPost.vdPostagem = data.vdPostagem;
                        var post = angular.copy($scope.newPost);
                        $scope.wallPosts.splice(0, 0, post);
                        ShowMessagePattern({tipo : 'success'}, 'Publicação cadastrada com Sucesso!');
                } else {
                        ShowMessagePattern({tipo : 'warning'}, 'Não foi possível registrar a Publicação! Por favor, tente novamente.');
                }

            })
            .error(function(data, status) {
                $route.reload();
                ShowMessagePattern({tipo : 'error'}, 'Erro ao tentar cadastrar nova Publicação!');
        });
    };
    
    /* MÉTODO USADO PARA REMOÇÃO DE POST PELO ID */
    $scope.removePost = function (post) {

        var modalInstanceOther = $modal
                .open({
                    templateUrl: 'view/modals/comum/_modalConfirmacao.html',
                    controller: 'ModalConfirmacaoCtrl',
                    backdrop: 'static',
                    resolve: {
                        // Por default os parâmetros são pra exclusão, mas podem ser alterados aqui
                        // (titulo, mensagem, botao)
                        params: function () {
                            return {};
                        }
                    }
                });

        modalInstanceOther.result.then( function (confirma) {
				if (confirma) {
					post.ativo = 'N';
                    post.nome = null;
                    post.sobrenome = null;
                    post.fotoPerfilMini = null;
                    $http.put(SERVICE_NAME, post)
                        .success(function(data) {
                                var index = $scope.wallPosts.map(function(e) {
                                    return e.id;
                                }).indexOf(post.id);
                                $scope.wallPosts.splice(index, 1);
                                ShowMessagePattern({tipo : 'success'}, 'Publicação removida com Sucesso!');
                        })
                        .error(function(data, status) {
                            ShowMessagePattern({tipo : 'error'}, 'Erro ao tentar remover Publicação!');
                    });
				}
		}, function () {
		});

    };
    
    /* ############################# POST METHODS END ############################# */
    
    /* ############################# POST COMMENT METHODS START ############################# */
    
    /* MÉTODO USADO PARA CRIAÇÃO DE NOVO COMENTÁRIO EM UM POST */
    $scope.commentPost = function(post, comentario) {
        $scope.criarObjComentario(comentario);
        $scope.comentario.postagemEntity = angular.copy(post);
        
        $scope.validateComment();
        $scope.comentarios = [];
        
        $http.post(SERVICE_NAME_COMMENT, $scope.comentario)
            .success(function(data) {
                var indice = $scope.wallPosts.indexOf(post);
                $scope.wallPosts[indice].comentarioEntity.push(angular.copy(data));
                //$scope.post.comentarioEntity.push(angular.copy(data));
                ShowMessagePattern({tipo : 'success'}, 'Comentário criado com Sucesso!');
            })
            .error(function(data, status) {
                $route.reload();
                ShowMessagePattern({tipo : 'error'}, 'Erro ao tentar criar comentário!');
        });
    };
    
    /* MÉTODO DE VALIDAÇÃO DA DESCRIÇÃO DO OBJETO COMENTÁRIO */
    $scope.validateComment = function() {
        var camposValidos = true;
			if($scope.comentario.dsComentario == null || $scope.comentario.dsComentario == '') {
                    ShowMessagePattern({tipo : 'warning'}, 'Você precisa escrever um comentário.');
                    camposValidos = false;
			}
			return camposValidos;
    };
    
    /* ############################# POST COMMENT METHODS END ############################# */
    
    /* ############################# POST LIKE METHODS START ############################# */
    $scope.isLiked = false;
    $scope.likePost = function(post) {
        if($scope.isLiked == true) {
            $scope.isLiked = false;
        } else {
            $scope.isLiked = true;
        }
    };
    
    /* ############################# POST LIKE METHODS END ############################# */
    
    /* ############################# POST SHARE METHODS START ############################# */
    
    $scope.sharePost = function(post) {
        /*var d = new Date();
        post.dtPostagem = d.getTime();
        post.id = null;
        post.idUsuario = $scope.authenticatedUser;
        post.likes = 0;
        post.dsPostagem = '';//descricao do modal que será exibido;
        $http.post(SERVICE_NAME, post)
            .success(function(data) {
                if(data) {
                        $scope.newPost.ativo = data.ativo;
                        $scope.newPost.dsPostagem = data.dsPostagem;
                        $scope.newPost.dtPostagem = data.dtPostagem;
                        $scope.newPost.ftPostagem = data.ftPostagem;
                        $scope.newPost.id = data.id;
                        $scope.newPost.idUsuario = data.idUsuario;
                        $scope.newPost.likes = data.likes;
                        $scope.newPost.vdPostagem = data.vdPostagem;
                        
                        $scope.wallPosts.push($scope.newPost);
                        ShowMessagePattern({
                            tipo : 'success'
                        }, 'Publicação cadastrada com Sucesso!');
                } else {
                        ShowMessagePattern({
                            tipo : 'warning'
                        }, 'Não foi possível registrar a Publicação! Por favor, tente novamente.');
                }

            })
            .error(function(data, status) {
                $route.reload();
                ShowMessagePattern({
                    tipo : 'error'
                }, 'Erro ao tentar cadastrar nova Publicação!');
        });*/
    };
    
    /* ############################# POST SHARE METHODS END ############################# */
    
    /* ############################# MENU RIGHT METHODS START ############################# */
    
    $scope.accessUserProfile = function(user) {
        $location.path('/userProfile/'+idAuthenticatedUser+'/'+user.id);
    };
    
    /* ############################# MENU RIGHT METHODS END ############################# */
    
});
