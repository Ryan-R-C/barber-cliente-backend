import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import SobreService from '../../services/categoriaService';

export default async (req, res, next) => {
  try {
    // new PermissionChecker(req).validateHas(
    //   Permissions.values.categoriaEdit,
    // );

    const payload = await new SobreService(req).update(
      req.params.id,
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
