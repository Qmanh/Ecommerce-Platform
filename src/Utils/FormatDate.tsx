import React from 'react'

export function formatDate(dateString:any) {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return dateString; // Return the original string if the date is invalid
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }