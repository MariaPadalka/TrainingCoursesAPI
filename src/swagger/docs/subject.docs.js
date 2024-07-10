/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Operations related to subjects
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Retrieve all subjects
 *     tags: [Subjects]
 *     responses:
 *       '200':
 *         description: Successful request. Returns a list of subjects.
 *       '500':
 *         description: Server error. Failed to retrieve subjects.
 *   post:
 *     summary: Add a subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *                 description: Name of the subject
 *               hourlyRate:
 *                 type: object
 *                 properties:
 *                   practice:
 *                     type: number
 *                     description: Hourly rate for practice
 *                   lecture:
 *                     type: number
 *                     description: Hourly rate for lecture
 *     responses:
 *       '201':
 *         description: Successful request. Adds a subject.
 *       '400':
 *         description: Bad request. Failed to add subject.
 */
