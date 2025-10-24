import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login as loginUser } from '../services/authService.js';
import useAuth from '../hooks/useAuth.js';

const LoginPage = () => {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuth();
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await loginUser(values);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to sign in. Please check your credentials.';
      setError('root', { type: 'server', message });
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h2 className="text-3xl font-semibold mb-6">Welcome back</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary-300"
            {...register('email', {
              required: 'Email is required'
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary-300"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 rounded-md font-medium hover:bg-primary-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
