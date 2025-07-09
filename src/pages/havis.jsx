import { useState } from "react";
import { Input, Button, Progress, message } from "antd";

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    FirstName: "",
    LastName: "",
    UserName: "",
    // Step 2
    Email: "",
    Phone: "",
    Address: "",
    // Step 3
    Password: "",
    ConfirmPassword: "",
    SecurityQuestion: "",
    SecurityAnswer: "",
    // Step 4
    ProfilePictureLink: "",
    Bio: "",
    Newsletter: false,
    Terms: false,
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep = () => {
    let newErrors = {};

    // validasi step 1
    if (currentStep === 1) {
      if (!formData.FirstName) newErrors.FirstName = "First Name wajib diisi";
      if (!formData.LastName) newErrors.LastName = "Last Name wajib diisi";
      if (!formData.UserName) newErrors.UserName = "User Name wajib diisi";
    }

    // validasi step 2
    if (currentStep === 2) {
      if (!formData.Email) newErrors.Email = "Email wajib diisi";
      if (!/\S+@\S+\.\S+/.test(formData.Email))
        newErrors.Email = "Format email tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log(currentStep);

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Form Data:", formData);
        message.success("Registrasi Berhasil 🎉");
      }, 1500);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <Input
              placeholder="First Name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              status={errors.FirstName && "error"}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              status={errors.LastName && "error"}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="User Name"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              status={errors.UserName && "error"}
              style={{ marginBottom: 10 }}
            />
          </div>
        );

      case 2:
        return (
          <div>
            <Input
              placeholder="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              status={errors.Email && "error"}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Phone Number"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
          </div>
        );

      case 3:
        return (
          <div>
            <Input.Password
              placeholder="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Input.Password
              placeholder="Confirm Password"
              name="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Security Question"
              name="SecurityQuestion"
              value={formData.SecurityQuestion}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Security Answer"
              name="SecurityAnswer"
              value={formData.SecurityAnswer}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
          </div>
        );

      case 4:
        return (
          <div>
            <Input
              placeholder="Profile Picture Link"
              name="ProfilePictureLink"
              value={formData.ProfilePictureLink}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Input.TextArea
              placeholder="Bio"
              name="Bio"
              value={formData.Bio}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <label>
              <input
                type="checkbox"
                name="Terms"
                checked={formData.Terms}
                onChange={handleChange}
              />{" "}
              Setuju dengan Terms & Conditions
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>
        Step {currentStep}/{totalSteps}
      </h2>
      <Progress
        percent={(currentStep / totalSteps) * 100}
        style={{ marginBottom: 20 }}
      />

      {renderStep()}

      <div style={{ marginTop: 20 }}>
        {currentStep > 1 && (
          <Button onClick={handlePrev} style={{ marginRight: 10 }}>
            Previous
          </Button>
        )}
        {currentStep < totalSteps && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === totalSteps && (
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
