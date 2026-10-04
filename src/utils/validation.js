export function validateReport(data){
 const errors={};
 if(!data.title?.trim()) errors.title='Enter an item name.';
 if(!data.category) errors.category='Choose a category.';
 if(!data.location) errors.location='Choose a location.';
 if(!data.date) errors.date='Choose the date.';
 if(!data.description?.trim()||data.description.trim().length<12) errors.description='Add at least 12 characters so matching can work well.';
 if(data.image && data.image.length>1.8*1024*1024) errors.image='Image is too large for this local demo. Choose a smaller image.';
 return errors;
}
