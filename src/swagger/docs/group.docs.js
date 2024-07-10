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

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Retrieve a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     responses:
 *       '200':
 *         description: Successful request. Returns the group.
 *       '404':
 *         description: Group not found.
 *       '500':
 *         description: Server error. Failed to retrieve the group.
 *   put:
 *     summary: Update a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
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
 *       '200':
 *         description: Successful request. Updates the group.
 *       '400':
 *         description: Bad request. Validation error or duplicate specialty and department pair.
 *       '404':
 *         description: Group not found.
 *       '500':
 *         description: Server error. Failed to update the group.
 *   delete:
 *     summary: Delete a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     responses:
 *       '200':
 *         description: Successful request. Deletes the group.
 *       '404':
 *         description: Group not found.
 *       '500':
 *         description: Server error. Failed to delete the group.
 */
