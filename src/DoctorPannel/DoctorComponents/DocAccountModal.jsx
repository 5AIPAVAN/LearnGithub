import React from 'react';
import { Box, Modal, Typography, useMediaQuery } from '@mui/material';
import Image from '../../assets/doctor.png'
import { LogButton, SignButton } from '../../CustomStyles/Styles';
import { Link } from 'react-router-dom';

const style = {
    height: 394,
    bgcolor: 'background.paper',
    p: 3.2,
    borderRadius: 1
};

const DocAccountModal = ({ forDocClose, dcopen }) => {

    const forBelow1080px = useMediaQuery('(max-width:1280px)');

    return (
        <React.Fragment>
            <Modal open={dcopen} onClose={forDocClose}>
                <Box sx={style} className={`position-absolute top-50 start-50 translate-middle ${forBelow1080px?'col-lg-4':'col-lg-3'} col-md-6 col-sm-7 col-10`}>
                    <div className='d-flex justify-content-center'>
                        <Box component={'img'} id="img-auth" src={Image} sx={{ width: 140, height: 140 }} />
                    </div>
                    <Typography className='mt-2' sx={{ textAlign: 'center',fontFamily: 'Montserrat',fontWeight:'bold' }} variant="p" component="p">
                        Sign up or Log in to your Health Mudraa Doctor account
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {/* <SignUpButton sx={{fontFamily: 'Montserrat',}} component={Link}  to={'/signup'} onClick={forDocClose}>Sign up</SignUpButton> */}
                        <SignButton variant='contained' style={{borderRadius:20,fontSize:18,backgroundColor:'#133680'}} component={Link}  to={'/doctor/signup'} onClick={forDocClose}>Signup</SignButton>
                        <LogButton style={{borderRadius:20,fontSize:18}} component={Link}  to={'/doctor/login'} onClick={forDocClose}>Login</LogButton>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default DocAccountModal
