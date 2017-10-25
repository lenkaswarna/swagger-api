var express = require('express');
var router = express.Router();

var api = require('../doctor.api');

/**
 * @swagger
 * definition:
 *   doctor:
 *   type: object
 *   properties:
 *     id:
 *      type: integer
 *    name:
 *       type: string
 *    picUrl:
 *       type: string
 *    briefDescription:
 *       type: string
 *     speciality:
 *      type: string
 *    exprience:
 *     type: string
 *   description:
 *      type: string
 *    contact:
 *      type: string
 *    email:
 *      type: string
 *    phoneno:
 *      type: integer
 *    status:
 *      type: string
 *      description: doctor Status
 *     enum:
 *         - available
 *         - pending
 *         - not exists
 *    waitingTime:
 *      type: integer
 *      format: int64
 *     rating:
 *       type: integer
 *      format: int64
 *     videoUrl:
 *       type: string
 *     appearUrl:
 *       type: string
 *    collapseId:
 *      type: string
 *    thumbnailUrl:
 *      type: string
 *    lastUpdateTime:
 *      type: integer
 *      format: int64
 */

/**
 * @swagger
 * /api/doctorGet:
 *   get:
 *     tags:
 *       - doctor
 *     description: Returns all doctor
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of doctor
 *         schema:
 *           $ref: '#/definitions/doctor'
 */
router.get('/api/doctorGet', api.getDoctors);

/** 
 * @swagger
 * /api/doctorPost:
 *  post:
 *    tags:
 *       - doctor
 *     summary: Add a new doctor to the list
 *     description: New doctor added
 *     operationId: addDoctor
 *    consumes:
 *      - application/json
 *      - application/xml
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *        description: Doctor object that needs to be added to the list
 *        required: true
 *        schema:
 *           $ref: '#/definitions/doctor'
 *    responses:
 *       '405':
 *         description: Invalid input
 *     security:
 *       - doctor_auth:
 *           - 'write:doctor'
 *          - 'read:doctor'
 */
router.post('/api/doctorPost', api.createDoctor);

/**
 * @swagger
 * /api/doctorEdit/{id}:
 *   put:
 *     tags:
 *       - doctor
 *     description: Updates a single doctor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: doctor's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: puppy
 *         description: doctor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/doctor'
 *     responses:
 *       200:
 *         description: Successfully updated      
 */
router.put('/api/doctorEdit/:id', api.updateDoctor);

/**
 * @swagger
 * /api/doctorDelete/{id}:
 *   delete:
 *     tags:
 *       - doctor
 *     description: Deletes a single doctor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: doctor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/api/doctorDelete/:id', api.deleteDoctor);


module.exports = router;