package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserVariant;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserVariant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserVariantRepository extends JpaRepository<UserVariant, Long> {

}
