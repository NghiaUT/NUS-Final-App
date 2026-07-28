import React, { useState } from 'react';
import MediaTabbar from '../../components/auth/MediaTabbar';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { signupSchema } from '../../utils/validators';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the field's error as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate against the zod schema
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors = {};
      Object.keys(fieldErrors).forEach((key) => {
        if (fieldErrors[key]?.[0]) {
          nextErrors[key] = fieldErrors[key][0];
        }
      });
      setErrors(nextErrors);
      toast.error('Vui lòng kiểm tra lại thông tin đã nhập!');
      return;
    }

    // 2. Extra cross-field check the schema itself doesn't cover
    if (formData.password !== formData.confirmedPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmedPassword: 'Mật khẩu xác nhận không khớp',
      }));
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await authService.signup(result.data);
      toast.success('Đăng ký thành công, vui lòng kiểm tra hộp thư và xác nhận!');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClasses = (fieldName) =>
    `w-full px-3 py-2.5 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${errors[fieldName]
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }`;

  return (
    <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
      <h1 className="text-blue text-5xl text-center font-semibold m-5">Fotobook Signup</h1>
      <MediaTabbar></MediaTabbar>
      <div className="flex w-full flex-col items-center justify-center py-8">
        {/* Container Card */}
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form className="space-y-4 w-full" onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={fieldClasses('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={fieldClasses('lastName')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={fieldClasses('email')}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={fieldClasses('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Password Confirmation
              </label>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                placeholder="Password"
                value={formData.confirmedPassword}
                onChange={handleChange}
                className={fieldClasses('confirmedPassword')}
              />
              {errors.confirmedPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmedPassword}</p>
              )}
            </div>

            {/* Signup Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
        <div className="text-center pt-8">
          <a
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373] cursor-pointer"
          >
            Has an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;