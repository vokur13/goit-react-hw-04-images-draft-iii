import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <Grid
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};
