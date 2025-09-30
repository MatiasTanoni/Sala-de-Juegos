import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.getUser();

  if (user) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
