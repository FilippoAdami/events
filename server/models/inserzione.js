/* 
ID int (chiave primaria)
ID pubblicatore int (chiave esterna)
titolo String (max 30 caratteri)
descrizione String (max 120 caratteri);
luogo int (14 caratteri)
data Date
ora Time
contatto String (max 30 caratteri)
click: int
apparizioni: int
*/

/*
GET: getAds (/), getAdById (../:adID), getAdsByUser (/profile) 
POST: postNewAd (../:newAd),
PUT: modifyAd (../:adID), 
DELETE: deleteAd (../:adID),
*/