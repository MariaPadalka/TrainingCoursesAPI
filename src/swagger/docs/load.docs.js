/**
 * @swagger
 * tags:
 *   name: Loads
 *   description: Operations related to loads
 */

/**
 * @swagger
 * /loads:
 *   get:
 *     summary: Retrieve all loads
 *     tags: [Loads]
 *     responses:
 *       '200':
 *         description: Successful request. Returns a list of loads.
 *       '500':
 *         description: Server error. Failed to retrieve loads.
 *   post:
 *     summary: Add a load
 *     tags: [Loads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherID:
 *                 type: string
 *                 description: ID of the teacher
 *               groupID:
 *                 type: string
 *                 description: ID of the group
 *               subjectID:
 *                 type: string
 *                 description: ID of the subject
 *               lessonType:
 *                 type: string
 *                 description: Type of lesson (practice or lecture)
 *               hours:
 *                 type: number
 *                 description: Number of hours
 *     responses:
 *       '201':
 *         description: Successful request. Adds a load.
 *       '400':
 *         description: Bad request. Failed to add load.
 */
