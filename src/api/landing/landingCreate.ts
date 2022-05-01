import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import LandingService from '../../services/landingService';
export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.landingCreate,
    );

    const payload = await new LandingService(req).create(
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
