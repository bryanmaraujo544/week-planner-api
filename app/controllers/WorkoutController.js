const WorkoutsRepository = require("../repositories/WorkoutsRepository");

class WorkoutController {
  async index(req, res) {
    const workout = await WorkoutsRepository.findAll();
  }

  async store(req, res) {
    const token = req.token;
    const userId = token.id;
    const { workoutName, day, createdAt } = req.body;

    const user = await WorkoutsRepository.create({ 
      name: workoutName, 
      day, 
      createdAt, 
      wasTrained: false, 
      userId  
    });

    console.log({ user });

    res.json({ message: 'User created', user });
  }

  async showByUserId(req, res) {
    const token = req.token;
    const workouts = await WorkoutsRepository.findByUserId(token.id);
    res.json({ workouts });
  }

  async update(req, res) {
    const { id } = req.params;
    console.log({ id });

    await WorkoutsRepository.update(id);
    res.json({ message: 'user updated' });
  }

  async delete(req, res) {
    const { id } = req.params;

    await WorkoutsRepository.delete(id);
    res.json({ message: 'User deleted' });
  }

  async deleteAll(req, res) {
    const token = req.token;
    const userId = token.id;
    console.log({ userId });
    await WorkoutsRepository.deleteAll(userId);

    res.status(200).json({ message: `All workouts deleted of the user with id ${userId}` })
  }
}

module.exports = new WorkoutController;