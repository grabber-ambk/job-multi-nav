import React from 'react';
import { Box, Grid } from '@mui/material';
import AppTextField from '@crema/components/AppTextField';
import AppCard from '@crema/components/AppCard';
import ImgUpload from './ImageUpload';
import styled from '@emotion/styled';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import AppScrollbar from '@crema/components/AppScrollbar';
import Slide from '@mui/material/Slide';
import { FileType } from '@crema/models/ecommerce/EcommerceApp';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const ReactQuillWrapper = styled(ReactQuill)(() => {
  return {
    '& .ql-editor, & .ql-container': {
      maxHeight: '100% !important',
    },
    '& .ql-toolbar': {
      borderRadius: '8px 8px 0 0',
    },
    '& .ql-container': {
      borderRadius: '0 0 8px 8px',
      minHeight: 150,
      maxHeight: 200,
    },
  };
});

type Props = {
  content: string;
  uploadedFiles: FileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const ProductContent = ({
  content,
  uploadedFiles,
  setUploadedFiles,
  setFieldValue,
}: Props) => {
  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Grid item xs={12} lg={8}>
        <AppScrollbar style={{ height: '700px' }}>
          <AppCard>
            <Box component="p" sx={{ fontSize: 16 }}>
              Product Name*
            </Box>
            <AppTextField
              name="title"
              variant="outlined"
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder="Product Name"
            />

            <Box component="p" sx={{ mt: 3, fontSize: 16 }}>
              Description*
            </Box>
            <Box
              sx={{
                width: '100%',
                my: 2,
              }}
            >
              <ReactQuillWrapper
                defaultValue={content}
                theme="snow"
                placeholder="Description here"
                onChange={(value) => setFieldValue('description', value)}
              />
            </Box>
            <Box component="p" sx={{ mt: 3, mb: 2, fontSize: 16 }}>
              Images
            </Box>
            <ImgUpload
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </AppCard>
        </AppScrollbar>
      </Grid>
    </Slide>
  );
};

export default ProductContent;
