
export const emojisBySentiment = (sentiment) => {
    switch (sentiment) {
      case 1:
        return <span class="material-symbols-outlined">sentiment_frustrated</span>;
      case 2:
        return <span class="material-symbols-outlined">sentiment_extremely_dissatisfied</span>;
      case 3:
        return <span class="material-symbols-outlined">sentiment_sad</span>;
      case 4:
        return <span class="material-symbols-outlined">sentiment_very_satisfied</span>;
      case 5:
        return <span class="material-symbols-outlined">sentiment_neutral</span>;
      default:
        return null;
    }
  }
  