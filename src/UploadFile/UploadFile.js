// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ErrorIcon from '@material-ui/icons/Error'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = theme => ({
})

const UploadFile = () => {
  // Translation
  const { t } = useTranslation()

  // States
  const [fileName, setFileName] = useState('')

  // Methods
  const uploadFile = (event) => {
    const file = event.target.files[0]
    setFileName(file.name)
  }

  const deleteFile = () => {
    setFileName('')
  }

  const downloadFile = () => {

  }

  // Render
  return (
    <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
      <Grid item>
        <Button variant="contained" component="label" onChange={uploadFile}>
          {t('genericcomponent.uploadfile.button.browse', 'Browse')}
          <input type="file" accept="text/csv" hidden />
        </Button>
      </Grid>
      <Grid item>
        <GetAppIcon style={{ color: '#FFFFFF', fontSize: 20 }} />
      </Grid>
      <Grid item>
        <Typography>
          <Link href="#" onClick={downloadFile}>
            {fileName}
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="error">
          <ErrorIcon style={{ color: '#F36121', fontSize: 40 }} />
        </IconButton>
      </Grid>
      <Grid item>
        <CircularProgress style={{ color: '#FFFFFF' }} />
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" onClick={deleteFile}>
          <DeleteIcon style={{ color: '#FFFFFF', fontSize: 40 }} />
        </IconButton>
      </Grid>
      <Grid item>
        <Tooltip title="Error: column name must be a string." placement="right-end">
          <InfoIcon style={{ color: '#FFFFFF', fontSize: 40 }} />
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default withStyles(useStyles)(UploadFile)
