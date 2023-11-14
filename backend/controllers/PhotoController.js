const Photo = require('../models/Photo');
const mongoose = require('mongoose');
// const {ObjectId} = require('mongodb');
const User = require('../models/User');

// Insert a photo, with an user related to it

const insertPhoto = async (req, res) => {
    const {title} = req.body;
    const image = req.file.filename;
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image, 
        title,
        userId: user._id,
        userName: user.name,
    });

    // Check if photo was created successfully
    if(!newPhoto){
        return res.status(422).json({error: 'Erro ao criar a foto'});
    
    }

    res.status(201).json(newPhoto);
}

const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;
  
    try {
      const photo = await Photo.findById(id);
  
      // Verificar se a foto existe
      if (!photo) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }
  
      // Verificar se o usuário é o proprietário da foto
      if (!photo.userId.equals(reqUser._id)) {
        return res.status(422).json({ error: 'Você não tem permissão para deletar essa foto' });
      }
  
      // Deletar a foto
      await Photo.deleteOne({ _id: id });
  
      res.status(200).json({ message: 'Foto deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar foto', err: err.message });
    }
};


// Get all photos
const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({}).sort([['createdAt', -1]]).exec();
    return res.status(200).json(photos);
}

//Get user photos
const getUserPhotos = async (req, res) => {
    const {id} = req.params;
    const photos = await Photo.find({userId:id}).sort([['createdAt', -1]]).exec();
    return res.status(200).json(photos);

};

// Get photo by id
const getPhotoById = async (req, res) => {
    const {id} = req.params;
    
    try{

        const photo = await Photo.findById(id);
        if(!photo) {
            return res.status(404).json({error: 'Foto não encontrada'});
        }
        res.status(200).json(photo);
    }catch{
        res.status(500).json({error: 'Erro ao buscar foto'});
    }
}

// Upload photo
const updatePhoto = async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    const reqUser = req.user;

    const photo = await Photo.findById(id); 
    if(!photo){
        return res.status(404).json({error: 'Foto não encontrada'});
    }

    if(!photo.userId.equals(reqUser._id)){
        return res.status(422).json({error: 'Você não tem permissão para editar essa foto'});
    }

    if(title){
        photo.title = title;
    }

    await photo.save();
    res.status(200).json(photo);
}


const likePhoto = async (req, res) => {

    const {id} = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);
    
    if(!photo){
        return res.status(404).json({error: 'Foto não encontrada'});
    }

    if(photo.likes.includes(reqUser._id)){
        return res.status(422).json({error: 'Você já curtiu essa foto'});
    }

    photo.likes.push(reqUser.id);
    await photo.save();
    res.status(200).json(photo);
    
}

const commentPhoto = async (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    if(!photo){
        return res.status(404).json({error: 'Foto não encontrada'});
    }

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
    };
    photo.comments.push(userComment);
    await photo.save();
    res.status(200).json({comment: userComment});
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto

}