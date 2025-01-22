import axios from "axios";

const baseAPI = "http://localhost:5000/api";

export const getEmailLayout = async () => {
  const response = await axios.get(`${baseAPI}/newtemplates/getEmailLayout`, {
    params: {
      title: emailConfig.title,
      content: emailConfig.content,
      imageUrl: emailConfig.imageURL,
    },
});
  return response.data;
};

export const uploadImage = async (formdata) => {
  const response = await axios.post(
    `${baseAPI}/newtemplates/uploadImage`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const uploadEmailConfig = async (config) => {
  const response = await axios.post(
    `${baseAPI}/newtemplates/uploadEmailConfig`,
    config
  );
  return response.data;
};

export const renderAndDownloadTemplate = async (config) => {
  const response = await axios.post(
    `${baseAPI}/newtemplates/renderAndDownloadTemplate`,
    config,
    { responseType: "blob" }
  );
  return response.data;
};
//CRUD operations
export const createTemplate = async (template) => {
  const response = await axios.post(
    `${baseAPI}/newtemplates/templates`,
    template
  );
  return response.data;
};

export const getAllTemplates = async () => {
  const response = await axios.get(`${baseAPI}/newtemplates/emailTemplates`);
  return response.data;
};

export const getTemplatesById = async (id) => {
  const response = await axios.get(`${baseAPI}/newtemplates/templatesid/${id}`);
  return response.data;
};

export const updateTemplate = async (id, updatedTemplate) => {
  const response = await axios.put(
    `${baseAPI}/newtemplates/updatetemplates/${id}`,
    updatedTemplate
  );
  return response.data;
};

export const deleteTemplate = async (id) => {
  const response = await axios.delete(
    `${baseAPI}/newtemplates/deletetemplates/${id}`
  );
  return response.data;
};
