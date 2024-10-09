const express = require('express');
const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const followService = require('../services/FollowService')
const dataToken = require('../../../Utils/helpers/dataByToken')

class FollowController extends BaseController {
    constructor() {
        super();
    }

    async getFollowers(req, res) {
        try {
            const { userid, page = 1 , limit = 10} = req.query;
            const result = await followService.getFollower(userid, page, limit);
            const message = res.t('messages.success_ation');
            this.success(res, result, message);
        } catch (error) {
            console.error(error);
            this.error(res, error, HttpStatus.BAD_REQUEST);
        }
    }

    async follow (req, res){
        try {
            const { followerid, followingid } = req.query;
            const result = await followService.follow(followerid,followingid)
            const message = res.t('messages.success_ation')
            this.success(res,result,message)
        } catch (error) {
            console.error(error)
            this.error(res, error, HttpStatus.BAD_REQUEST);
        } 
    }

    async count (req, res){
        try {
            const { userid } = req.query;
            const result = await followService.count(userid)
            const message = res.t('messages.success_ation')
            this.success(res,result,message)
        } catch (error) {
            console.error(error)
            this.error(res, error, HttpStatus.BAD_REQUEST);
        } 
    }



    async getFollowings (req, res){
        try {
            const { userid, page = 1 , limit = 10} = req.query;
            const result = await followService.getFollowings(userid, page, limit)
            const message = res.t('messages.success_ation')
            this.success(res,result,message)
        } catch (error) {
            console.error(error)
            this.error(res, error, HttpStatus.BAD_REQUEST);
        } 
    }

    async followByUsername (req, res){
        try {
            const { followerid, usernamefollowingid } = req.query;
            const result = await followService.followByUsername(followerid,usernamefollowingid)
            const message = res.t('messages.success_ation')
            this.success(res,result,message)
        } catch (error) {
            this.error(res, error, HttpStatus.BAD_REQUEST);
        } 
    }

    async followersAndFollowings(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const userLogged = dataToken.extractUserIdFromToken(token);
            const { userid, page = 1, limit = 10 } = req.query;
    
            // Obtener seguidos y seguidores del userid proporcionado
            const followings = await followService.getFollowings(userid, page, limit);
            const followers = await followService.getFollower(userid, page, limit);
    
            // Obtener las personas que el usuario logueado sigue
            const loggedUserFollowings = await followService.getFollowings(userLogged, 1, 1000); // Obtenemos todos los seguidos del usuario logueado
            const loggedUserFollowingIds = loggedUserFollowings.map(f => f.followingid);
    
            // Filtrar seguidores que no sigue el usuario logueado
            const followersNotFollowedBack = followers.filter(f => !loggedUserFollowingIds.includes(f.followerid));
    
            // Obtener los IDs de seguidores para comparar con seguidos
            const followersIds = followers.map(f => f.followerid);
    
            // Filtrar seguidos que no son seguidores del usuario
            const followingsNotFollowers = followings.filter(f => !followersIds.includes(f.followingid));
    
            const message = res.t('messages.success_action');
            this.success(res, {
                followings,
                followers,
                followersNotFollowedBack, // Seguidores que el usuario logueado no sigue de vuelta
                followingsNotFollowers // Seguidos que no siguen al usuario logueado
            }, message);
    
        } catch (error) {
            console.error(error);
            this.error(res, error, HttpStatus.BAD_REQUEST);
        }
    }
}

module.exports = FollowController;