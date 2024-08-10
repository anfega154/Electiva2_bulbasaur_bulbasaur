const express = require('express');
const BaseController = require('../../BaseControlller');
const HttpStatus = require('../../../../Utils/helpers/Httpstatus')
const followService = require('../../../../app/services/Follow/FollowService')

class FollowController extends BaseController {
    constructor() {
        super();
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

    async getFollowers (req, res){
        try {
            const { userid } = req.query;
            const result = await followService.getFollower(userid)
            const message = res.t('messages.success_ation')
            this.success(res,result,message)
        } catch (error) {
            console.error(error)
            this.error(res, error, HttpStatus.BAD_REQUEST);
        } 
    }
}

module.exports = FollowController;