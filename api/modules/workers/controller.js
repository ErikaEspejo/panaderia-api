const { locale } = require("../../../locale");
const { get } = require("../users/router");
const Workers = require("./model");
const {
  salaryCalculation,
  companyContributions,
  workerContributions,
} = require("../../services/workerService");

const list = async (req, res) => {
  Workers.findAll({
    attributes: [
      "idType",
      "id",
      "firstName",
      "lastName",
      "position",
      "entryDate",
      "retreatDate",
      "state",
      "totalDayHours",
      "totalNightHours",
      "totalHolidayDayHours",
      "totalHolidayNightHours",
      "salary",
      "healthContribution",
      "pension",
      "risk",
      "arl",
      "compensation",
      "totalCompanyToPay",
      "totalWorkerToPay",
      "totalToSend",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (worker) => {
    res.status(200).json({
      data: worker,
    });
  });
};

const create = async (req, res) => {
  await Workers.sync();
  const {
    idType,
    id,
    firstName,
    lastName,
    position,
    entryDate,
    retreatDate,
    state,
    totalDayHours,
    totalNightHours,
    totalHolidayDayHours,
    totalHolidayNightHours,
    salary,
    risk,
  } = req.body;

  const workerSalary = salaryCalculation(
    salary,
    totalDayHours,
    totalNightHours,
    totalHolidayDayHours,
    totalHolidayNightHours
  );
  const companyPayments = companyContributions(workerSalary, risk);
  const workerPayments = workerContributions(workerSalary);

  const newWorker = {
    idType,
    id,
    firstName,
    lastName,
    position,
    entryDate,
    retreatDate,
    state,
    totalDayHours,
    totalNightHours,
    totalHolidayDayHours,
    totalHolidayNightHours,
    salary: workerSalary,
    healthContribution: companyPayments.health,
    pension: companyPayments.pension,
    risk,
    arl: companyPayments.arl,
    compensation: companyPayments.compensation,
    totalCompanyToPay:
      companyPayments.health +
      companyPayments.pension +
      companyPayments.arl +
      companyPayments.compensation,
    totalWorkerToPay: workerPayments.pension + workerPayments.health,
    totalToSend:
      workerSalary - (workerPayments.pension + workerPayments.health),
  };

  await Workers.create(newWorker)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(400)
        .json({ message: locale.translate("errors.workers.onCreate") });
    });
};

const update = async (req, res) => {
  await Workers.sync();
  const id = req.params.id;
  const {
    firstName,
    lastName,
    position,
    entryDate,
    retreatDate,
    state,
    totalDayHours = "0",
    totalNightHours = "0",
    totalHolidayDayHours = "0",
    totalHolidayNightHours = "0",
    salary,
    risk = 1,
  } = req.body;

  if (
    firstName &&
    lastName &&
    position &&
    entryDate &&
    state &&
    totalDayHours.toString() &&
    totalNightHours.toString() &&
    totalHolidayDayHours.toString() &&
    totalHolidayNightHours.toString() &&
    salary.toString() &&
    risk.toString()
  ) {
    const workerSalary = salaryCalculation(
      salary,
      totalDayHours,
      totalNightHours,
      totalHolidayDayHours,
      totalHolidayNightHours
    );

    const companyPayments = companyContributions(workerSalary, risk);
    const workerPayments = workerContributions(workerSalary);
    const workerUpdated = {
      firstName,
      lastName,
      position,
      entryDate,
      retreatDate,
      state,
      totalDayHours,
      totalNightHours,
      totalHolidayDayHours,
      totalHolidayNightHours,
      salary: workerSalary,
      healthContribution: companyPayments.health,
      pension: companyPayments.pension,
      risk,
      arl: companyPayments.arl,
      compensation: companyPayments.compensation,
      totalCompanyToPay:
        companyPayments.health +
        companyPayments.pension +
        companyPayments.arl +
        companyPayments.compensation,
      totalWorkerToPay: workerPayments.pension + workerPayments.health,
      totalToSend:
        workerSalary - (workerPayments.pension + workerPayments.health),
    };

    const found = await Workers.findOne({
      where: { id },
    });

    if (found) {
      await found
        .update({
          idType: workerUpdated.idType,
          id: workerUpdated.id,
          firstName: workerUpdated.firstName,
          lastName: workerUpdated.lastName,
          position: workerUpdated.position,
          entryDate: workerUpdated.entryDate,
          retreatDate: workerUpdated.retreatDate,
          state: workerUpdated.state,
          totalDayHours: workerUpdated.totalDayHours,
          totalNightHours: workerUpdated.totalNightHours,
          totalHolidayDayHours: workerUpdated.totalHolidayDayHours,
          totalHolidayNightHours: workerUpdated.totalHolidayNightHours,
          risk: workerUpdated.risk,
          salary: workerUpdated.salary,
          healthContribution: workerUpdated.healthContribution,
          pension: workerUpdated.pension,
          arl: workerUpdated.arl,
          compensation: workerUpdated.compensation,
          totalCompanyToPay: workerUpdated.totalCompanyToPay,
          totalWorkerToPay: workerUpdated.totalWorkerToPay,
          totalToSend: workerUpdated.totalToSend,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.workers.onUpdate"),
          })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: `${locale.translate("errors.workers.onUpdate")} ${id}`,
          });
        });
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.workers.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Workers.sync();
  const { id } = req.body;

  const found = await Workers.findOne({
    where: { id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.workers.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.workers.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("costo no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.workers.notExists") });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  await Workers.findOne({
    where: { id },
    attributes: [
      "idType",
      "id",
      "firstName",
      "lastName",
      "position",
      "entryDate",
      "retreatDate",
      "state",
      "totalDayHours",
      "totalNightHours",
      "totalHolidayDayHours",
      "totalHolidayNightHours",
      "salary",
      "healthContribution",
      "pension",
      "risk",
      "arl",
      "compensation",
      "totalCompanyToPay",
      "totalWorkerToPay",
      "totalToSend",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (worker) => {
    if (worker) {
      res.status(200).json({
        data: worker,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.workers.notExists") });
    }
  });
};

module.exports = {
  list,
  create,
  update,
  remove,
  getOne,
};
