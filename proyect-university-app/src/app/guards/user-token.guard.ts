import { CanActivateFn } from '@angular/router';

export const userTokenGuard: CanActivateFn = (route, state) => {
  return true;
};
