import { SignUpProvider } from '../hooks/SignUpContext';
import SignUp from '../views/SignUp';

const SignUpController = () => {
  return (
    <SignUpProvider>
      <SignUp />
    </SignUpProvider>
  );
};

export default SignUpController;
