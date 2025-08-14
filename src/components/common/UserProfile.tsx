const UserProfile = ({
  email,
  className,
}: {
  email: string;
  className?: string;
}) => {
  return (
    <span className="hover:bg-primary/90 bg-primary p-1 flex items-center justify-center rounded-full">
      <span
        className={`${className} bg-primary text-white flex items-center justify-center cursor-pointer rounded-full`}
      >
        {email?.slice(0, 2).toUpperCase()}
      </span>
    </span>
  );
};
export default UserProfile;
