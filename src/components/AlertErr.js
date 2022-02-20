import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  const ErrALert = ({text}) => {
      return(
        <Alert status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>{text}!</AlertTitle>
        {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
        {/* <CloseButton position='absolute' right='8px' top='8px' /> */}
      </Alert>
      )
  }
  export default ErrALert