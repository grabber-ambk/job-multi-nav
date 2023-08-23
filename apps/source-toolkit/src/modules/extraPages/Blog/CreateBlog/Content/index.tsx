import React from 'react';
import { Box, Grid } from '@mui/material';
import AppTextField from '@crema/components/AppTextField';
import AppCard from '@crema/components/AppCard';
import ImgUpload from './ImageUpload';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FileType } from '@crema/models/extrapages/Blog';

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
  content: string | undefined;
  uploadedFiles: FileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  setFieldValue: (field: string, value: any) => void;
};

const BlogContent = ({
  content,
  uploadedFiles,
  setUploadedFiles,
  setFieldValue,
}: Props) => {
  return (
    <Grid item xs={12} lg={8}>
      <AppCard>
        <Box component="p" sx={{ fontSize: 16 }}>
          Blog Name*
        </Box>
        <AppTextField
          name="title"
          variant="outlined"
          sx={{
            width: '100%',
            my: 2,
          }}
          placeholder="Blog Name"
        />

        <Box component="p" sx={{ mt: 3, fontSize: 16 }}>
          Description
        </Box>
        <AppTextField
          multiline
          name="description"
          variant="outlined"
          rows={4}
          sx={{
            width: '100%',
            my: 2,
          }}
          placeholder="Description here"
        />

        <Box component="p" sx={{ mt: 3, fontSize: 16 }}>
          Content*
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
            onChange={(value) => setFieldValue('content', value)}
          />
        </Box>
        <Box component="p" sx={{ mt: 3, mb: 2, fontSize: 16 }}>
          Cover Image
        </Box>
        <ImgUpload
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </AppCard>
    </Grid>
  );
};

export default BlogContent;
