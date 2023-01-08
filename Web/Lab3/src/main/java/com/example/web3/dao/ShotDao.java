package com.example.web3.dao;

import com.example.web3.entity.Shot;
import jakarta.inject.Named;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

@Named("ShotDao")
public class ShotDao implements Serializable {
    @PersistenceContext(unitName = "shots")
    private EntityManager entityManager;
    private EntityManagerFactory entityManagerFactory;

    public void createEntityManager() {
        entityManagerFactory = Persistence.createEntityManagerFactory("shots");
        entityManager = entityManagerFactory.createEntityManager();
    }

    public void addShotToDB(Shot shot) {
        entityManager.getTransaction().begin();
        try {
            entityManager.persist(shot);
        } catch (Exception e) {
            entityManager.getTransaction().rollback();
        }
        entityManager.getTransaction().commit();
    }


    public List<Shot> getShotsFromDB() {
        return entityManager.createQuery("select s from Shot s", Shot.class).getResultList();
    }

    public void clearShotsInBD() {
        entityManager.getTransaction().begin();
        try {
            entityManager.createQuery("DELETE FROM Shot").executeUpdate();
        } catch (Exception e) {
            entityManager.getTransaction().rollback();
        }
        entityManager.getTransaction().commit();
    }
}