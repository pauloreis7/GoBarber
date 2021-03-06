import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController'
import ListProviderMonthAvailabilityController from '../controllers/ListProviderMonthAvailabilityController'
import ListProviderDayAvailabilityController from '../controllers/ListProviderDayAvailabilityController'

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ListProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }),
  providerMonthAvailabilityController.index
);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }),
  providerDayAvailabilityController.index
);

export default providersRouter;
