// src/services/giftCardService.ts
import { GiftCard, content } from '../types/giftCard';
import api from './api';

  // @param formData - An object containing the gift card form data. This includes

  //@returns A promise that resolves to the created `GiftCard` object.

  export const getGiftCards = async (): Promise<GiftCard[]> => {
    try {
      const response = await api.get('/gift-cards');
      if (response.data.success && Array.isArray(response.data.data)) {
        return response.data.data.map((card: GiftCard) => {
          let descriptionContent: content[] = [];
          try {
            let descObj: unknown = card.description;
            if (typeof descObj === 'string') {
              descObj = JSON.parse(descObj);
            }
            // Handle both array and string content
            if (
              descObj &&
              typeof descObj === 'object' &&
              'content' in descObj
            ) {
              const contentValue = (descObj as { content: unknown }).content;
              if (Array.isArray(contentValue)) {
                descriptionContent = contentValue.map((desc: content) => ({
                  title: desc.title,
                  description: desc.description,
                  type: desc.type
                }));
              } else if (typeof contentValue === 'string') {
                // If content is a string, wrap it in a content[] with type 'text'
                descriptionContent = [{
                  title: '',
                  description: contentValue,
                  type: 'text'
                }];
              }
            }
          } catch {
            descriptionContent = [];
          }
          return {
            ...card,
            image: card.image || card.media?.[0]?.image || card.media?.[0]?.publicId,
            description: descriptionContent,
          };
        });
      }
    } catch (error) {
      console.error('Error fetching gift cards:', error);
    }
    return [];
  };


export const getGiftCardById = async (id: string): Promise<GiftCard | null> => {
    try {
        const response = await api.get(`/gift-cards/${id}`);
        if (response.data.success && response.data.data) {
            const card = response.data.data;
            let descriptionContent: content[] = [];
            try {
                let descObj: unknown = card.description;
                if (typeof descObj === 'string') {
                    descObj = JSON.parse(descObj);
                }
                if (
                    descObj &&
                    typeof descObj === 'object' &&
                    'content' in descObj
                ) {
                    const contentValue = (descObj as { content: unknown }).content;
                    if (Array.isArray(contentValue)) {
                        descriptionContent = contentValue.map((desc: content) => ({
                            title: desc.title,
                            description: desc.description,
                            type: desc.type
                        }));
                    } else if (typeof contentValue === 'string') {
                        descriptionContent = [{
                            title: '',
                            description: contentValue,
                            type: 'text'
                        }];
                    }
                }
            } catch {
                descriptionContent = [];
            }
            return {
                ...card,
                image: card.image || card.media?.[0]?.image || card.media?.[0]?.publicId,
                description: descriptionContent,
            };
        }
    } catch (error) {
        console.error('Error fetching gift card details:', error);
    }
    return null;
};
//Helper function to safely parse description
// const parseDescription = (description: string | content[]): content[] => {
//   if (Array.isArray(description)) return description;
//   try {
//     const parsed = JSON.parse(description);
//     return Array.isArray(parsed.content) ? parsed.content : [];
//   } catch {
//     return [];
//   }
// };