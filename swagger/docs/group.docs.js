/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Operations related to groups
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Retrieve all groups
 *     tags: [Groups]
 *     responses:
 *       '200':
 *         description: Successful request. Returns a list of groups.
 *       '500':
 *         description: Server error. Failed to retrieve groups.
 *   post:
 *     summary: Add a group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *                 description: Specialty of the group
 *               department:
 *                 type: string
 *                 description: Department of the group
 *               studentCount:
 *                 type: number
 *                 description: Number of students in the group
 *     responses:
 *       '201':
 *         description: Successful request. Adds a group.
 *       '400':
 *         description: Bad request. Validation error or duplicate specialty and department pair.
 *       '500':
 *         description: Server error. Failed to add group.
 */
