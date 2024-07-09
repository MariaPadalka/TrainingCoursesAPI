/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Operations related to teachers
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers
 *     tags: [Teachers]
 *     responses:
 *       '200':
 *         description: Successful request. Returns a list of teachers.
 *       '500':
 *         description: Server error. Failed to retrieve teachers.
 *   post:
 *     summary: Add a teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastName:
 *                 type: string
 *                 description: Teacher's last name
 *               firstName:
 *                 type: string
 *                 description: Teacher's first name
 *               patronymic:
 *                 type: string
 *                 description: Teacher's patronymic
 *               phone:
 *                 type: string
 *                 description: Teacher's phone number
 *               experience:
 *                 type: number
 *                 description: Years of experience
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of subject IDs
 *     responses:
 *       '201':
 *         description: Successful request. Adds a teacher.
 *       '400':
 *         description: Bad request. Validation error.
 *       '500':
 *         description: Server error. Failed to add teacher.
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to retrieve
 *     responses:
 *       '200':
 *         description: Successful request. Returns the specified teacher.
 *       '404':
 *         description: Teacher not found.
 *       '500':
 *         description: Server error. Failed to retrieve teacher.
 *   put:
 *     summary: Update a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Updated first name of the teacher
 *               lastName:
 *                 type: string
 *                 description: Updated last name of the teacher
 *               patronymic:
 *                 type: string
 *                 description: Updated patronymic of the teacher
 *               phone:
 *                 type: string
 *                 description: Updated phone number of the teacher
 *               experience:
 *                 type: number
 *                 description: Updated experience in years of the teacher
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Updated list of subject IDs taught by the teacher
 *     responses:
 *       '200':
 *         description: Successful request. Returns the updated teacher.
 *       '400':
 *         description: Client error. Failed to update teacher.
 *       '404':
 *         description: Teacher not found.
 *   patch:
 *     summary: Partially update a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Updated first name of the teacher
 *               lastName:
 *                 type: string
 *                 description: Updated last name of the teacher
 *               patronymic:
 *                 type: string
 *                 description: Updated patronymic of the teacher
 *               phone:
 *                 type: string
 *                 description: Updated phone number of the teacher
 *               experience:
 *                 type: number
 *                 description: Updated experience in years of the teacher
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Updated list of subject IDs taught by the teacher
 *     responses:
 *       '200':
 *         description: Successful request. Returns the updated teacher.
 *       '400':
 *         description: Client error. Failed to update teacher.
 *       '404':
 *         description: Teacher not found.
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to delete
 *     responses:
 *       '200':
 *         description: Successful request. Teacher deleted.
 *       '404':
 *         description: Teacher not found.
 *       '500':
 *         description: Server error. Failed to delete teacher.
 */
