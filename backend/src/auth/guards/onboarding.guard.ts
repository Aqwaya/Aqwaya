import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException 
} from '@nestjs/common';

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    if (!user.isOnboarded) {
      throw new ForbiddenException({
        message: 'Onboarding incomplete',
        errorCode: 'ONBOARDING_REQUIRED',
        statusCode: 403,
      });
    }

    return true;
  }
}