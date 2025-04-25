export const cleanDescription = (description: string | { content: { title?: string; description: string }[] }) => {
  if (typeof description === 'string') {
    return description;
  }

  return description.content.map(section => ({
    title: section.title || '',
    text: section.description
  }));
};